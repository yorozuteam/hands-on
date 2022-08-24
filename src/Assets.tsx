import React,{ useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'

import Books from './Books';
import AssetItems from './AssetItems';

const Assets = () =>{
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>HOME</Tab>
          <Tab>図書</Tab>
          <Tab>固定資産</Tab>
        </TabList>
        <TabPanel>
          <h1>すごいHOME</h1>
          <p>いろいろここに書く</p>
        </TabPanel>
        <TabPanel>
          <Books />
        </TabPanel>
        <TabPanel>
          <AssetItems />
        </TabPanel>
      </Tabs>
      <p>すごい</p>
    </>
  )
}

export default Assets