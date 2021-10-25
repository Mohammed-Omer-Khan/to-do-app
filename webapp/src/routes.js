import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { Button, Result } from 'antd';

const Tasks = lazy(() => import('./components/website/Tasks'));
const DeletedTasks = lazy(() => import('./components/website/DeletedTasks'));



const NotFound = _ =>
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link to="/"><Button type="primary">Back Home</Button></Link>}
  />;




const Layout = _ => (
  <Suspense fallback={<LoadingOutlined style={{ fontSize: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: "20%" }} spin />}>
    <Router basename="">
      <Switch>
        <Route exact path='/' component={Tasks} />
        <Route exact path='/deletedtasks' component={DeletedTasks} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Suspense>
)

export default Layout;