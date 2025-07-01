import React from 'react';
import Header from '../components/layout/Header';
import ArticleList from '../components/articles/ArticleList';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <main>
        <ArticleList />
      </main>
    </div>
  );
};

export default Dashboard;