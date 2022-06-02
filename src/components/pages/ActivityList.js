// imports: main
// imports: custom hooks
import useVariables from '../../customhooks/useVariables'
import useIcons from '../../customhooks/useIcons'
import ActLikePost from './activity_components/ActLikePost'
import ActCommentPost from './activity_components/ActCommentPost'
import ActLikeTell from './activity_components/ActLikeTell'
import ActCommentTell from './activity_components/ActCommentTell'
import ActFollow from './activity_components/ActFollow'
import ActFriends from './activity_components/ActFriends'

// imports: components


const ActivityList = ({ activities }) => {
   const { host_url } = useVariables()
   const { verified_icon } = useIcons()
   
   const getActivityType = (activity) => {
      // like_post, like_tell, comment_post, comment_tell, follow
      return activity.activity_type
   }
   
   // console.log(activities)
   return (
      <main>
         <section className="activity-wrapper">

            
            { activities.map((activity) => (
               <div key={activity.id}>
                  {/* Like Post */}
                  {getActivityType(activity) === "like_post" && <ActLikePost activity={activity} host_url={host_url} verified_icon={verified_icon} />}
                  {/* Comment Post */}
                  {getActivityType(activity) === "comment_post" && <ActCommentPost activity={activity} host_url={host_url} verified_icon={verified_icon} />}

                  {/* Like Tell */}
                  {(getActivityType(activity) === "like_tell" && <ActLikeTell activity={activity} host_url={host_url} verified_icon={verified_icon} />)}
                  {/* Comment Tell */}
                  {(getActivityType(activity) === "comment_tell" && <ActCommentTell activity={activity} host_url={host_url} verified_icon={verified_icon} />)}

                  {/* Follow */}
                  {(getActivityType(activity) === "follow" && <ActFollow activity={activity} host_url={host_url} verified_icon={verified_icon} />)}

                  {/* Friends */}
                  {(getActivityType(activity) === "friends" && <ActFriends activity={activity} host_url={host_url} verified_icon={verified_icon} />)}
               </div>

               
               
            ))}
            
         </section>
      </main>
   );
}

export default ActivityList;