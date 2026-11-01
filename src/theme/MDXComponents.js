import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import { Icon } from '@iconify-icon/react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Steps from '@site/src/components/Steps';
import VideoTutorial from '@site/src/components/VideoTutorial';
import FeatureCards from '@site/src/components/FeatureCards';
import Available from '@site/src/components/Available';
import FeatureNotAvailable from '@site/src/components/FeatureNotAvailable';

export default {
  ...MDXComponents,
  IIcon: Icon,
  Tabs,
  TabItem,
  Steps,
  VideoTutorial,
  FeatureCards,
  Available,
  FeatureNotAvailable,
};
