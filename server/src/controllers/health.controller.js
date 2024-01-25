import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const health = asyncHandler( async (req, res) => {
    // TODO: Build a health response
    return res.status(200).json(new ApiResponse(200,{}, "Good!"))
})

export {
    health
}