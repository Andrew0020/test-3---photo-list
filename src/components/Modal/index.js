import React, { useState, useEffect } from 'react';

import noImage from '../../assets/img/no-image.png';
import './index.css';

const Modal = ({
    visible = false,
    onClose,
    imageId,
}) => {
    const [imgSrc, setImgSrc] = useState(noImage);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // получения большого изображения и списка комментариев
        imageId && fetch(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setImgSrc(data.url);
                setComments(data.comments);
            });

        return setImgSrc(noImage);

        // на случай, если отвалится api (для тестового задания)
        // const imageId237 = {"id":237,"url":"https://picsum.photos/id/237/600/400","comments":[{"id":153,"text":"Крутая фотка","date":1578054737927}]};
        // const imageId238 = {"id":238,"url":"https://picsum.photos/id/238/600/400","comments":[]};
        // const imageId239 = {"id":239,"url":"https://picsum.photos/id/239/600/400","comments":[]};
        // const imageId240 = {"id":240,"url":"https://picsum.photos/id/240/600/400","comments":[{"id":154,"text":"Мне нравится","date":1578054737927}]};
        // const imageId241 = {"id":241,"url":"https://picsum.photos/id/241/600/400","comments":[]};
        // const imageId242 = {"id":242,"url":"https://picsum.photos/id/242/600/400","comments":[]};
    }, [imageId]);

    if (!visible) return null;

    const addComment = () => {
        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;

        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';

        // добавление комментария (204 – OK, комментарий не сохраняется)
        fetch(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            // body: JSON.stringify({
            //     id: data.id,
            //     text: 'Крутая фотка111',
            //     date: 1578054737927
            // })
            body: JSON.stringify({
                name: name,
                comment: comment
            })
        })
            .then((response) => {
                console.log(response.status + ': ' + response.statusText);

                if (response.status === 204 ) {
                    setComments((comments) => [...comments, {
                        id: Date.now(),
                        text: comment,
                        date: Date.now(),
                    }]);
                }
            });
    }

    return (
        <React.Fragment>
            <div className="substrate" onClick={onClose} />
            <div className="modal">
                <div className="photo-add-comment">
                    <img className="img" src={imgSrc} alt="" />
                    <input id="name" placeholder="Ваше имя" />
                    <input id="comment" placeholder="Ваш комментарий" />
                    <div className="add-comment" onClick={addComment}>Оставить комментарий</div>
                </div>

                <div className="comments">
                    { comments.length > 0
                        ? comments.map((comment) => {
                            return (
                                <div className="comment" key={comment.id}>
                                    <div className="date">{comment.date && new Date(comment.date).toLocaleDateString()}</div>
                                    <div>{comment.text}</div>
                                </div>
                            );
                        })
                        : (
                            <div className="comment">
                                <div className="date">xx.xx.xx</div>
                                <div>Здесь будет Ваш комментарий</div>
                            </div>
                        )
                    }
                </div>

                <div className="close" onClick={onClose} />
            </div>
        </React.Fragment>
    )
}

export default Modal;
