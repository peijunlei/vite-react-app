import { loadPlugins, useAmap } from "@amap/amap-react";
import { Button, message } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";


interface GeoLocationProps {
  onSuccess?: (result: any) => void;
  onFailed?: (result: any) => void;
  autoMove?: boolean;
}
function GeoLocation(props: GeoLocationProps, ref: any) {
  const { onSuccess, onFailed, autoMove = true } = props;

  const [status, setStatus] = useState("idle");
  const map = useAmap();
  const locate = async () => {
    setStatus("busy");
    const AMap = await loadPlugins("AMap.Geolocation");
    const geo = new AMap.Geolocation();
    geo.getCurrentPosition((status, result) => {
      if (
        status === "complete"
      ) {
        setStatus("success");
        message.success('定位成功')
        onSuccess && onSuccess(result);
        if (map && autoMove) {
          map.setCenter(result.position);
          map.setZoom(15);
        }
      } else {
        setStatus("failed");
        onFailed && onFailed(result);
        message.warning(result)

      }
    });
  };

  const handleClick = () => {
    if (status === "busy") return;
    locate();
  };

  const STATUS_DICT = {
    idle: "定位到当前位置",
    busy: "定位中...",
    success: "定位到当前位置",
    failed: "重试"
  };
  useImperativeHandle(ref, () => ({
    locate
  }))
  return (
    <div className="geo-location">
      <Button onClick={handleClick} disabled={status === "busy"}>
        {STATUS_DICT[status]}
      </Button>
    </div>
  );
}

export default forwardRef(GeoLocation)