export function formatResponseSuccess(response, data, message = "success", status = 200) {
    const responseData = { message, data }
    return response.status(status).json(responseData)
}

export function formatResponseError(response, err, status = 200) {
    const responseData = { message: err.message, status: err.status }
    return response.status(status).json(responseData)
}