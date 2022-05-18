export function formatResponseSuccess(response, data, message = "success", status = 200) {
    const responseData = { message, data }
    return response.status(status).json(responseData)
}

export function formatResponseError(response, err, status = 500) {
    const responseData = { message: err.message, data: err }
    return response.status(status).json(responseData)
}