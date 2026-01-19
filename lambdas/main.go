package main

import (
	"encoding/json"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type App struct {
	id string
}

func newApp(id string) *App {
	return &App{
		id: id,
	}
}

func (app *App) handleRequest(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	responseBody := map[string]string{
		"message": "it fucking worked!",
	}

	responseJSON, err := json.Marshal(responseBody)
	if err != nil {
		return events.APIGatewayProxyResponse{
			StatusCode: http.StatusInternalServerError,
			Headers:    map[string]string{"Content-Type": "application/json"},
			Body:       `{error: internal server error}`,
		}, nil
	}

	response := events.APIGatewayProxyResponse{
		Body:       string(responseJSON),
		StatusCode: http.StatusOK,
		Headers: map[string]string{
			"Content-Type":                     "text/plain",
			"Access-Control-Allow-Origin":      "*", //add backend and frontend here, * = everyone, not good
			"Access-Control-Allow-Headers":     "Content-Type",
			"Access-Control-Allow-Methods":     "OPTIONS, POST, GET",
			"Access-Control-Allow-Credentials": "true",
		},
	}

	return response, nil
}

func main() {
	id := "someRandomString"
	app := newApp(id)
	lambda.Start(app.handleRequest)
}
