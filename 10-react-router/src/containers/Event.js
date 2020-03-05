import React from 'react';
import { Layout } from './Layout';
import { useParams } from 'react-router-dom';

function Event() {
  const { slug } = useParams();

  return (
    <Layout>
      <div>Event page: event id = {slug}</div>
    </Layout>
  );
}

export default Event;
