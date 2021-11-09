const { ApolloServer, gql } = require("apollo-server");

// TODO move
const typeDefs = gql`
  type BlogEntry {
    id: ID
    categories: [String]
    date: String
    title: String
    body: String
    code: String
  }

  type Query {
    blogEntries: [BlogEntry]
  }
`;

// TODO move
const blogEntries = [
  {
    id: 1,
    categories: ["frontEnd", "javaScript"],
    date: "10/24/2021",
    title: "Create React App",
    body: "This application was built by following the Create React App guide found here https://create-react-app.dev/",
    code: `npx create-react-app my-app --template typescript`,
  },
  {
    id: 2,
    categories: ["hosting"],
    date: "10/24/2021",
    title: "Hosting with Digital Ocean",
    body: `I wanted to be able to show this project off and easily deploy changes.  I was already familiar Digital Ocean's droplets, but saw they introduced "Apps" that make it easy to deploy code without needing to manage the server.`,
  },
  {
    id: 3,
    categories: ["javaScript"],
    date: "10/24/2021",
    title: "Code Snippets",
    body: "I wanted to be able to show code examples, so I added the react-syntax-highlighter package to this project and created a wrapper component to be used throughout.",
    code: `
// syntax highlighter
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeSnippetProps {
  code: string;
}

const CodeSnippet = ({ code }: CodeSnippetProps) => {
  return (
    <SyntaxHighlighter language="javascript" style={a11yDark}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeSnippet;
`,
  },
  {
    id: 4,
    categories: ["frontEnd", "javaScript"],
    date: "10/29/2021",
    title: "Unit Tests",
    body: "Unit tests for this project are built with jest and testing-library/react.  testing-library/react makes testing react components simple and straightforward.  Here's an example on how to test the click handler of the filter buttons found at the top of this blog.",
    code: `
test("BlogCategorySelect category can be toggled", () => {
  const setCategories = jest.fn();
  const { container } = render(
    <BlogCategorySelect
      categories={["frontEnd"]}
      setCategories={setCategories}
    />
  );
  fireEvent(
    getByText(container, "Front End"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );
  expect(setCategories).toHaveBeenCalledTimes(1);
});    
`,
  },
];

// TODO move
const resolvers = {
  Query: {
    blogEntries: () => blogEntries,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
