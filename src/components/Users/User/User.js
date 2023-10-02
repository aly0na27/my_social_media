import s from "./User.module.css"
import avatarIcon from "./../../../assets/images/1573589.png"

function User(props) {
    return (
        <div className={s.userWrapper}>
            <div className={s.userItem}>

                <img className={s.userIcon} src={avatarIcon} alt=""/>
                <div className={s.wrapperButton}>
                    {
                        props.followed ?
                            <button className={s.button} onClick={() => props.unfollow(props.id)}>Unfollowed</button> :
                            <button className={s.button} onClick={() => props.follow(props.id)}>Followed</button>
                    }
                </div>
            </div>
            <div className={s.userItem}>
                {
                    <h4>{props.name}</h4>
                }
            </div>

        </div>
    )
}

export default User;