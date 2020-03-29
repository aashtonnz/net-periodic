import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { faTimesCircle as remove } from "@fortawesome/free-solid-svg-icons";
import {
  faCaretDown as down,
  faCaretUp as up
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { unfollowTopic } from "../../actions/topic";
import { TopicLink } from "../../views/styled";
import {
  RemoveIcon,
  ItemWrapper,
  ShowTopicButton,
  ListWrapper
} from "./styled";

const FollowedTopics = ({
  followedTopics,
  unfollowTopic,
  canRemove = false
}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <ShowTopicButton onClick={() => setShow(!show)}>
        Topics <Icon icon={show ? up : down} />
      </ShowTopicButton>
      {show && (
        <ListWrapper>
          {followedTopics.sort().map((topic, index) => (
            <ItemWrapper key={index}>
              <TopicLink to={`/topic/${topic}`}>{topic}</TopicLink>
              {canRemove && (
                <RemoveIcon
                  onClick={() => unfollowTopic(topic, true)}
                  icon={remove}
                />
              )}
            </ItemWrapper>
          ))}
        </ListWrapper>
      )}
    </>
  );
};

FollowedTopics.propTypes = {
  followedTopics: PropTypes.array.isRequired,
  unfollowTopic: PropTypes.func.isRequired,
  canRemove: PropTypes.bool
};

export default connect(null, { unfollowTopic })(FollowedTopics);
