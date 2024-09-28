import {responseErrWithMsg, responseOk} from "~/helpers/response";
import {createUserRequestSchema} from "~/helpers/schemas";
import {createUserService} from "~/services/userServices";

const createUserRouter = async (req, res) => {
  try {
    const createUserRequest = await createUserRequestSchema.validate(req.body);
    const result = await createUserService(createUserRequest);
    const item = pick(result, ['id', 'name', 'phone']);
    return responseOk(res,  {
      item
    });
  }catch(error) {
    return responseErrWithMsg(res, err);
  }
};

module.exports.createUserRouter = createUserRouter;
