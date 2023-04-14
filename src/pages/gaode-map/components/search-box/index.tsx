import { loadAmap, loadPlugins, usePlugins } from "@amap/amap-react";
import { AutoComplete, Cascader, Input, message, Space } from "antd";
import { useMemo, useState } from "react";
import {debounce} from 'lodash'
import cities from "../../data";
const noop = () => { };


export type SingType = (string | number)[]
interface SearchBoxProps {
  city?: SingType;
  onSearch?: (v: string) => void;
  onCityChange?: (v: SingType) => void;
  query?: string
}

function SearchBox(props: SearchBoxProps) {
  const { onSearch, onCityChange, query, city } = props;
  const AMap = usePlugins(["AMap.AutoComplete"]);
  const [options, setOptions] = useState([]);
  const ac = useMemo(() => {
    if (AMap) return new AMap.AutoComplete({
      city,
      citylimit: true
    });
    else return null;
  }, [AMap, city]);
  const handleSearch = (kw) => {
    if (!ac) return;
    if (!kw) {
      setOptions([]);
      return;
    }
    ac.search(kw, (status, result) => {
      if (status === "complete" && result.tips) {
        const uniq = new Set(result.tips.map((tip) => tip.name));
        setOptions(Array.from(uniq));
      } else {
        setOptions([]);
        message.warning(result)
      }
    });
  };

  const onSelect = (value: string) => {
    onSearch && onSearch(value);
  };

  return (
    <div className="search-box">
      <Space.Compact>
        <Cascader
          options={cities}
          value={city}
          onChange={(values) => {
            onCityChange && onCityChange(values);
          }}
          allowClear={false}
          placeholder="选择城市"
          style={{ width: 100 }}
          displayRender={(labels) =>
            labels.length > 0 ? labels[labels.length - 1] : ""
          }
        />
        <AutoComplete
          defaultValue={query}
          options={options.map((value) => ({
            value,
            label: value
          }))}
          onSelect={onSelect}
          onSearch={debounce(handleSearch,1000)}
        >
          <Input.Search
            placeholder="输入“星巴克”试试"
            enterButton
            onSearch={onSelect}
          />
        </AutoComplete>
      </Space.Compact>
    </div>
  );
}

export default SearchBox