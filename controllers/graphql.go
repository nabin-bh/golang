package controllers

import (
    "github.com/graphql-go/graphql"
	"github.com/gin-gonic/gin"
)

var bookType = graphql.NewObject(graphql.ObjectConfig{
    Name: "Book",
    Fields: graphql.Fields{
        "id":    &graphql.Field{Type: graphql.String},
        "title": &graphql.Field{Type: graphql.String},
        "author": &graphql.Field{Type: graphql.String},
    },
})

var queryType = graphql.NewObject(graphql.ObjectConfig{
    Name: "Query",
    Fields: graphql.Fields{
        "books": &graphql.Field{
            Type: graphql.NewList(bookType),
            Resolve: func(p graphql.ResolveParams) (interface{}, error) {
                return "Hello, World!", nil
            },
        },
    },
})

var schema, _ = graphql.NewSchema(graphql.SchemaConfig{
    Query: queryType,
})

func GraphqlHandler(c *gin.Context) gin.HandlerFunc {
    return func(c *gin.Context) {
        // Execute the GraphQL query
        result := graphql.Do(graphql.Params{
            Schema:        schema,
            RequestString: c.PostForm("query"), // You can get the query from the POST request
        })

        c.JSON(200, result)
    }
}