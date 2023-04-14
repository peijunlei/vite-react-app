


import './index.less'
import { Amap, Marker, Circle, loadPlugins, useAmap, loadAmap, useAmapEvents } from "@amap/amap-react";

import { useEffect, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import SearchBox, { SingType } from './components/search-box';
import SearchList from './components/search-list';
import GeoLocation from './components/GeoLocation';
const { Search } = Input;
const noop = () => { };
function AMap(props: any) {
  const $map = useRef(null);
  const geoRef = useRef(null);
  const [keywords, setKeywords] = useState<string>('')
  const [city, setCity] = useState<SingType>([]);
  const [zoom, setZoom] = useState(15);
  const [center, setCenter] = useState([116.473571, 39.993083]);
  const [position, setPosition] = useState(null);
  const [results, setResults] = useState([]);
  const [hover, setHover] = useState(null);
  const [mode, setMode] = useState("input");
  const clearSearch = () => {
    setResults([]);
    setHover(null);
  };
  function init() {
    geoRef.current?.locate()
  }
  useEffect(() => {
  }, [])

  return (
    <div className='map-container'>
      <Amap
        onComplete={() => {
          setTimeout(() => {
            init();
          }, 500)
        }}
        ref={$map}
        zoom={zoom}
        center={center}
        //热门地址点击事件
        onHotspotClick={(e, v) => {
          console.log(v?.name);
          setCenter([v.lnglat.lng, v.lnglat.lat]);
        }}
      >
        {
          mode === "input" && <SearchBox
            query={keywords}
            onSearch={(query) => {
              clearSearch();
              setKeywords(query)
              setMode("result");
            }}
            city={city}
            onCityChange={(v) => {
              setCity(v)
            }}
          />
        }
        {
          mode === "result" &&
          <SearchList
            city={city[city.length - 1]}
            query={keywords}
            onClose={() => {
              clearSearch();
              setMode("input");
            }}
            onResult={(results) => {
              setResults(results);
              if ($map.current) {
                setTimeout(() => {
                  $map.current.setFitView();
                }, 1000);
              }
            }}
            onSelect={(poi) => {
              setHover(poi);
              if ($map.current) {
                $map.current.setZoomAndCenter(
                  18,
                  [poi.location.lng, poi.location.lat],
                  true
                );
              }
            }}
          />
        }


        <GeoLocation
          ref={geoRef}
          autoMove
          onSuccess={(e) => {
            setPosition([e.position.getLng(), e.position.getLat()]);
          }}
        />
        {results.map((poi) => (
          <Marker
            onClick={(e)=>{
              console.log(poi);
            }}
            key={poi.id}
            position={[poi.location.lng, poi.location.lat]}
            label={
              poi === hover
                ? {
                  content: poi.name,
                  direction: "bottom"
                }
                : { content: "" }
            }
            zIndex={poi === hover ? 110 : 100}
            onMouseOver={() => setHover(poi)}
            onMouseOut={() => setHover(null)}
          />
        ))}
        {position && (
          <Marker
            position={position}
            label={{
              content: "我在这里",
              direction: "bottom"
            }}
          />
        )}
        {position && (
          <Circle center={position} radius={1000} fillOpacity={0.3} bubble />
        )}
      </Amap>
    </div>

  );
}

export default AMap;
