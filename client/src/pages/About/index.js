import React from "react";
import { PageHeader as Header, Link, A } from "../../views/styled";
import { Content, Ul, SubHeader, Ol } from "./styled";

const About = () => {
  return (
    <>
      <Header>About</Header>
      <Content>
        <Ul>
          <li>
            Net Periodic is a{" "}
            <A
              href="https://en.wikipedia.org/wiki/Periodical_literature"
              target="_blank"
            >
              periodical
            </A>{" "}
            for the internet
          </li>
          <li>Share content each week and subscribe to contributors</li>
        </Ul>
      </Content>
      <SubHeader>How does it work?</SubHeader>
      <Content>
        <Ol>
          <li>
            <Link to="/signup" target="_blank">
              Sign up
            </Link>{" "}
            and submit a link
          </li>
          <li>
            Add{" "}
            <Link to="/topics" target="_blank">
              topics
            </Link>{" "}
            to your link — e.g. <em>science</em>, <em>politics</em>,{" "}
            <em>culture</em>
          </li>
          <li>Subscribe to contributors and follow topics</li>
          <li>
            Links are{" "}
            <Link to="/home" target="_blank">
              published
            </Link>{" "}
            on <strong>Fridays at midnight GMT</strong>
          </li>
          <li>Links are ordered by the number of subscribers</li>
        </Ol>
      </Content>
      <SubHeader>Why?</SubHeader>
      <Content>
        <Ul>
          <li>
            Every day the New York Times publishes{" "}
            <A
              href="https://www.theatlantic.com/technology/archive/2016/05/how-many-stories-do-newspapers-publish-per-day/483845/"
              target="_blank"
            >
              100 articles
            </A>
            , YouTube adds{" "}
            <A
              href="http://videonitch.com/2017/12/13/36-mind-blowing-youtube-facts-figures-statistics-2017-re-post/"
              target="_blank"
            >
              400,000 hours
            </A>{" "}
            of video, WordPress publishes{" "}
            <A href="https://wordpress.com/activity/posting/" target="_blank">
              1 million blog posts
            </A>
            , and{" "}
            <A
              href="https://www.internetlivestats.com/twitter-statistics/"
              target="_blank"
            >
              500 million tweets
            </A>{" "}
            are shared on Twitter
          </li>
          <li>
            Every day the average person spends{" "}
            <A
              href="https://www.clickz.com/internet-growth-usage-stats-2019-time-online-devices-users/235102/"
              target="_blank"
            >
              {" "}
              6 hours online
            </A>
          </li>
          <li>
            Net Periodic is an experiment in breaking out of the{" "}
            <A href="https://en.wikipedia.org/wiki/Attention_economy">
              attention economy
            </A>
          </li>
        </Ul>
      </Content>
      <SubHeader>Contact</SubHeader>
      <Content>
        <Ul>
          <li>
            This is an{" "}
            <A href="https://github.com/aashtonnz/net-periodic" target="_blank">
              open source
            </A>{" "}
            project — feedback is welcome
          </li>

          <li>
            Please email{" "}
            <A href="mailto:contact@mg.netperiodic.com" target="_blank">
              contact@mg.netperiodic.com
            </A>
          </li>
        </Ul>
      </Content>
    </>
  );
};

export default About;
