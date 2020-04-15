import React, { useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import Header from '../../containers/Header';

import './index.css';

const MainLayer = () => {
  const [image] = useImage('/images/set-1/opg_demo_02.jpg');
  return <Image image={image} />;
};

const Layer1 = () => {
  const [image] = useImage('/images/set-1/layer01.png');
  return <Image image={image} />;
};

const Layer2 = () => {
  const [image] = useImage('/images/set-1/layer02.png');
  return <Image image={image} />;
};

const Layer3 = () => {
  const [image] = useImage('/images/set-1/layer03.png');
  return <Image image={image} />;
};

const App = () => {
  const [stageScale, setStageScale] = useState(0.4);
  const [stageX, setStageX] = useState(1);
  const [stageY, setStageY] = useState(1);

  const handleWheel = (e) => {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();

    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    setStageScale(newScale);
    setStageX(
      -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale
    );
    setStageY(
      -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
    );
  };

  return (
    <>
      <Header />
      <div className="imageHolder">
        <div className="images">
          <Stage
            width={950}
            height={500}
            onWheel={handleWheel}
            draggable={true}
            scaleX={stageScale}
            scaleY={stageScale}
            x={stageX}
            y={stageY}
          >
            <Layer>
              <MainLayer />
              <Layer1 />
              <Layer2 />
              <Layer3 />
            </Layer>
          </Stage>
        </div>
      </div>
    </>
  );
};

export default App;
