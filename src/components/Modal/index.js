import React, { useState, useEffect } from 'react';
import cn from 'classnames';

// import noImage from '../../assets/img/no-image.png';
import loading from '../../assets/img/loading_spinner.gif';
import './index.css';

const Modal = ({
    visible = false,
    onClose,
    imageId,
}) => {
    const [imgSrc, setImgSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [isInputNameError, setIsInputNameError] = useState(false);
    const [isInputCommentError, setIsInputCommentError] = useState(false);
    const [inputNameValue, setInputNameValue] = useState('');
    const [inputCommentValue, setInputCommentValue] = useState('');

    useEffect(() => {
        // получения большого изображения и списка комментариев
        imageId && fetch(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setImgSrc(data.url);
                setComments(data.comments);
                setIsLoading(false);
            });

        return () => {
            setImgSrc(null);
            setComments([]);
            setIsLoading(true);
        }

        // на случай, если отвалится api (для тестового задания)
        // const imageId237 = {"id":237,"url":"https://picsum.photos/id/237/600/400","comments":[{"id":153,"text":"Крутая фотка","date":1578054737927}]};
        // const imageId238 = {"id":238,"url":"https://picsum.photos/id/238/600/400","comments":[]};
        // const imageId239 = {"id":239,"url":"https://picsum.photos/id/239/600/400","comments":[]};
        // const imageId240 = {"id":240,"url":"https://picsum.photos/id/240/600/400","comments":[{"id":154,"text":"Мне нравится","date":1578054737927}]};
        // const imageId241 = {"id":241,"url":"https://picsum.photos/id/241/600/400","comments":[]};
        // const imageId242 = {"id":242,"url":"https://picsum.photos/id/242/600/400","comments":[]};
    }, [imageId]);

    if (!visible) return null;

    const onChangeInputName = (e) => {
        setIsInputNameError(false);
        setInputNameValue(e.target.value);
    }

    const onChangeInputComment = (e) => {
        setIsInputCommentError(false);
        setInputCommentValue(e.target.value);
    }

    const addComment = () => {
        if (!Boolean(inputNameValue)) {
            setIsInputNameError(true);
        }

        if (!Boolean(inputCommentValue)) {
            setIsInputCommentError(true);
        }

        if (Boolean(inputNameValue) && Boolean(inputCommentValue)) {
            // добавление комментария (204 – OK, комментарий не сохраняется)
            fetch(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    name: inputNameValue,
                    comment: inputCommentValue
                })
            })
                .then((response) => {
                    console.log(response.status + ': ' + response.statusText);

                    if (response.status === 204 ) {
                        setComments((comments) => [...comments, {
                            id: Date.now(),
                            text: inputCommentValue,
                            date: Date.now(),
                        }]);
                        setInputNameValue('');
                        setInputCommentValue('');
                    }
                });
        }
    }

    return (
        <React.Fragment>
            <div className="substrate" onClick={onClose} />
            <div className="modal">
                <div className="photo">
                    <img className="img" src={imgSrc} alt="" />
                    {isLoading && (
                        <img className="loadingModal" src={loading} alt="loading" />
                    )}
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

                <div className="add-comment">
                    <input
                        id="name"
                        className={cn({
                            'input': true,
                            'input-error': isInputNameError
                        })}
                        placeholder="Ваше имя"
                        onChange={onChangeInputName}
                        value={inputNameValue}
                    />
                    <input
                        id="comment"
                        className={cn({
                            'input': true,
                            'input-error': isInputCommentError
                        })}
                        placeholder="Ваш комментарий"
                        onChange={onChangeInputComment}
                        value={inputCommentValue}
                    />
                    <div className="add-comment-button" onClick={addComment}>Оставить комментарий</div>
                </div>

                <div className="close" onClick={onClose} />
            </div>
        </React.Fragment>
    )
}

export default Modal;
