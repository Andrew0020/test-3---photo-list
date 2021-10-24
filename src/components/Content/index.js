import React, { useEffect, useState } from 'react';
import Modal from '../Modal';

import './index.css';

const Content = () => {
  const [imageList, setImageList] = useState([]);
  const [isModal, setModal] = useState(false);
  const [imageId, setImageId] = useState(null);

  useEffect(() => {
    // получение списка фотографий
    fetch('https://boiling-refuge-66454.herokuapp.com/images')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setImageList(data);
      });

    // на случай, если отвалится api (для тестового задания)
    // const imageList = [
    //   {"id":237,"url":"https://picsum.photos/id/237/300/200"},
    //   {"id":238,"url":"https://picsum.photos/id/238/300/200"},
    //   {"id":239,"url":"https://picsum.photos/id/239/300/200"},
    //   {"id":240,"url":"https://picsum.photos/id/240/300/200"},
    //   {"id":241,"url":"https://picsum.photos/id/241/300/200"},
    //   {"id":242,"url":"https://picsum.photos/id/242/300/200"}
    // ];
  }, []);

  const onClose = () => setModal(false);

  const handleClick = (event) => {
    const id = event.target.getAttribute('id');

    setImageId(id);
    setModal(true);
  }

  return (
    <React.Fragment>
      <div className="content">
        <Modal
          visible={isModal}
          onClose={onClose}
          imageId={imageId}
        />

        { imageList.map((item) => {
          return (
            <div className="item" key={item.id} onClick={handleClick}>
              <img id={item.id} src={item.url} alt="" />
            </div>
          );
        })}
      </div>

      <div>
        остаётся
        <ol>
          <li>Добавление комментов: проверка на пустое имя и коммент</li>

          <li>Вёрстка доделать и адаптив</li>
        </ol>
      </div>
    </React.Fragment>
  );
}

export default Content;
