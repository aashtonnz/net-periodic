import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { faTimesCircle as remove } from "@fortawesome/free-solid-svg-icons";
import {
  faCaretDown as down,
  faCaretUp as up
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { unsubscribe } from "../../actions/profile";
import { UserLink } from "../../views/styled";
import { RemoveIcon, ItemWrapper, ShowSubsButton, ListWrapper } from "./styled";

const ItemWrappers = ({ subscribedTo, unsubscribe, canRemove = false }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <ShowSubsButton onClick={() => setShow(!show)}>
        Subscriptions <Icon icon={show ? up : down} />
      </ShowSubsButton>
      {show && (
        <ListWrapper>
          {subscribedTo
            .sort((userA, userB) => (userB.name > userA.name ? -1 : 1))
            .map(({ username, name }, index) => (
              <ItemWrapper key={index}>
                <UserLink to={`/user/${username}`}>
                  {name} @{username}
                </UserLink>
                {canRemove && (
                  <RemoveIcon
                    onClick={() => unsubscribe(username, null, true)}
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

ItemWrappers.propTypes = {
  subscribedTo: PropTypes.array.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  canRemove: PropTypes.bool
};

export default connect(null, { unsubscribe })(ItemWrappers);
