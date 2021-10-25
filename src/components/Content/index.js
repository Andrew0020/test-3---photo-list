import React, { useEffect, useState } from 'react';
import Modal from '../Modal';

import loading from '../../assets/img/loading_spinner.gif';
import './index.css';

const Content = () => {
  const [imageList, setImageList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(false);
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
        { imageList.map((item) => {
          return (
            <div className="item" key={item.id} onClick={handleClick}>
              <img id={item.id} src={item.url} alt="" />
            </div>
          );
        })}

        {isLoading && (
          <div className="loading">
            <img src={loading} alt="loading" />
          </div>
        )}
      </div>

      <Modal
        visible={isModal}
        onClose={onClose}
        imageId={imageId}
      />
    </React.Fragment>
  );
}

export default Content;
