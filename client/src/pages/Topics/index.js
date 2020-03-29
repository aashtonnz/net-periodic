import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setTopics } from "../../actions/topic";
import { PageHeader as Header, TopicLink } from "../../views/styled";
import { ItemWrapper } from "../MyUser/styled";
import { NumPosts, Description } from "./styled";

const Topics = ({ setTopics, topics }) => {
  useEffect(() => {
    setTopics();
  }, [setTopics]);

  return (
    <>
      <Header>Topics</Header>
      <Description>Ordered by total number of posts:</Description>
      {topics &&
        topics.map((topic, index) => (
          <ItemWrapper key={index}>
            <TopicLink to={`/topic/${topic.value}`}>{topic.value}</TopicLink>
            <NumPosts>({topic.numPosts})</NumPosts>
          </ItemWrapper>
        ))}
    </>
  );
};

Topics.propTypes = {
  setTopics: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  topics: state.topic.topics
});

export default connect(mapStateToProps, { setTopics })(Topics);
