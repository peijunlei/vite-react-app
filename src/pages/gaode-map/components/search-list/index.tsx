import { usePlugins } from "@amap/amap-react";
import { Button, Card, List, message } from "antd";
import { useEffect, useMemo, useState } from "react";


interface SearchListProps {
  onClose?: () => void;
  query?: string
  city: any;
  onResult: (val: any[]) => void;
  onSelect:(val:any) => void;
}
function SearchList(props: SearchListProps) {
  const AMap = usePlugins(["AMap.PlaceSearch"]);
  const { onClose, query, city, onResult,onSelect } = props
  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const ps = useMemo(() => {
    if (AMap)
      return new AMap.PlaceSearch({
        city:'北京市',
        citylimit: true
      });
    else return null;
  }, [AMap, city]);
  async function getList() {
    if (!ps) return;
    ps.search(query, (status, result) => {
      if (status === "complete" && result.poiList) {
        setLoading(false)
        setList(result.poiList.pois);
        setTotal(result.poiList.count);
        onResult(result.poiList.pois);
      } else {
        setLoading(false)
        setList([]);
        setTotal(0);
        onResult([]);
        message.warning(result)

      }
    });
  }
  useEffect(() => {
    getList()
  }, [ps])
  return (
    <div>
      <Card
        className="search-result"
        title={`共约 ${total} 条结果`}
        extra={
          <Button className="cancel-button" type="link" onClick={onClose}>
            返回
          </Button>
        }
        headStyle={{ padding: "0 12px" }}
        bodyStyle={{
          maxHeight: "450px",
          width:'400px',
          overflowY: "scroll",
          padding: "0 12px 24px"
        }}
      >
        <List
          dataSource={list}
          loading={loading}
          renderItem={(poi) => (
            <List.Item
              onClick={() => onSelect && onSelect(poi)}
              style={{ cursor: "pointer" }}
            >
              <List.Item.Meta title={poi.name} description={poi.address} />
            </List.Item>
          )}
        />
      </Card>
    </div>
  )
}
export default SearchList