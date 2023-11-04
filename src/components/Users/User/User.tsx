import s from "./User.module.css"
import avatarIcon from "./../../../assets/images/avatar.svg"
import {NavLink} from "react-router-dom";
import * as React from "react";


type PropsType = {
    id: number,
    name: string,
    photos: string,
    followed: boolean,
    followingInProgress: Array<number>,
    setUnfollow: (userId: number) => void,
    setFollow: (userId: number) => void
}

const User: React.FC<PropsType> = ({id, name, photos, followingInProgress, followed, setFollow, setUnfollow}) => {
    return (
        <div className={s.userWrapper}>
            <NavLink to={'/profile/' + id}>
                <img src={photos !== null ? photos : avatarIcon} className={s.userIcon} alt={""}/>
            </NavLink>
            {
                <NavLink className={s.nameUser__link} to={"/profile/" + id}>
                    <h3 className={s.nameUser}>{name}</h3>
                </NavLink>
            }
            <div className={s.wrapperButton}>
                {
                    followed ?
                        <button disabled={followingInProgress.some(userId => id === userId)}
                                className={s.button + ' ' + s.activeBtn}
                                onClick={() => {
                                    setUnfollow(id);
                                }}>
                            Unfollowed
                        </button> :
                        <button disabled={!!followingInProgress.some(userId => id === userId)}
                                className={s.button + ' ' + s.disactiveBtn}
                                onClick={() => {
                                    setFollow(id);
                                }}>
                            Followed
                        </button>
                }
            </div>
        </div>
    )
}

export default User;