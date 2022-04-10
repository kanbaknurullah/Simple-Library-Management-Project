module.exports = {
    /**
     * Respond with error data.
     * params: {
     *      response: Response object from the requests
     *      error: Error object
     * }
     */
    handleError: function (response, error) {
        console.log(response.req.url, error.message || error, error.stack);

        response.json({
            status: {
                success: false,
                code: 404
            },
            error: error.message || error
        });
    },
    /**
     * Respond with expected data. 
     * params: {
     *      response: Response object from the requests
     *      data: Data of the response, it's type should be an object
     * }
     */
    send: function (response, data) {
        response.json({
            status: {
                success: true,
                code: 200
            },
            error: false,
            data: data
        });
    }
};
