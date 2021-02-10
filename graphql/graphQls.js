import gql from 'graphql-tag';

const qqls = {
  createTodo: gql`
    mutation($ownerId:ID!, $title: String!){
      createTodo(title: $title, ownerId: $ownerId){ 
        id
        title
        completed
      }
    }
  `,

  deleteTodo: gql`
    mutation($id:ID!){
      deleteTodo(id: $id){
        title
        completed
        id
      }
    }
  `,

  getTodo: gql`
    query($ownerId: ID!){
      todos(ownerId:$ownerId){
        id
        title
        completed
      }
    }
  `,

  updateTodo: gql`
    mutation($id: ID!, $status: Boolean!) {
      updateTodo(id: $id, status: $status){
        id
        title
        completed
      }
    }
  `,

  getUser: gql`
    mutation($email: String!, $password: String!){
      login(email:$email ,password: $password){
        email
        id
        admin
      }
    }
  `,

  createUser: gql`
    mutation($email: String!, $password: String!){
      createUser(email: $email, password: $password){
        id
        email
        admin
      }
    }
  `,
  subscriptionTodoCreated: gql`
    subscription {
    todoCreated {
      id
      title
      ownerId
      completed
    }
  }
`,
  subscriptionTodoDeleted: gql`
    subscription {
    todoDeleted {
      id
      title
      ownerId
      completed
    }
  }
`,
  subscriptionTodoUodated: gql`
    subscription {
    todoUpdated {
      id
      title
      ownerId
      completed
    }
  }
`,

};

export default qqls;
