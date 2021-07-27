import { createPage } from '../createPage';
import { getUsersServerSideProps, UsersContainer } from '../users';
import { getUsersLayout } from '../users/Users.layout';

export const getServerSideProps = getUsersServerSideProps;

const Home = createPage(UsersContainer);

Home.meta = {
  renderLayout: getUsersLayout,
};

export default Home;
