import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getAllReviewsThunk } from '../../store/review';


function BusinessReviews() {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const reviews = useSelector(state => state.review.allreviews)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllReviewsThunk(restaurantId)).then(() => {
            setLoaded(true);
        })
    }, [dispatch, restaurantId])

    console.log(reviews)
    console.log(reviews?.length > 0)
    console.log(typeof reviews)


    return loaded && (
        <div className='business-review-container'>
            <a name="reviewSession"></a>

            <div className='b-review-left'>
            </div>

            <div className='b-review-right'>
                <h3>What {reviews?.length} people are saying</h3>

                <div>
                    Overall ratings and reviews
                </div>

                <div>
                    Sort by
                    <select>
                        <option>Newest</option>
                        <option>Highest rating</option>
                        <option>Lowest rating</option>
                    </select>
                </div>
                {reviews?.length > 0 && reviews?.map(review => {
                    return <div className='b-review-each' key={review.id}>
                        <div className='b-review-left'>
                            <div>{review.user.first_name.slice(0,1)}{review.user.last_name.slice(0,1)}</div>
                            <div>{review.user.username}</div>
                        </div>
                        <div className='b-review-right'>
                            <div className='b-review-left-top'>
                                <div>stars~~~~~</div>
                                <div>Reviewed on {review.updated_at.slice(5, 11)}, {review.updated_at.slice(12, 16)}</div>
                                <div>Overall {review.overall} · </div>
                                <div>Food {review.food} · </div>
                                <div>Service{review.service} · </div>
                                <div>Ambience{review.ambience}</div>
                            </div>
                            <div className='b-review-bottom'>{review.review_body}</div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    )
}

export default BusinessReviews;
