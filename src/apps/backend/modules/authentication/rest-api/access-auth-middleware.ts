import {
  applicationController,
  Request,
  Response,
  NextFunc,
} from 'backend/modules/application';
import {
  AuthorizationHeaderNotFound,
  AuthenticationService,
  InvalidAuthorizationHeader,
  UnAuthorizedAccessError,
} from 'backend/modules/authentication';
import _ from 'lodash';

export const accessAuthMiddleware = applicationController(
  (req: Request, _res: Response, next: NextFunc) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AuthorizationHeaderNotFound();
    }

    const [authScheme, authToken] = authHeader.split(' ');
    if (authScheme !== 'Bearer' || _.isEmpty(authToken)) {
      throw new InvalidAuthorizationHeader();
    }

    const authPayload = AuthenticationService.verifyAccessToken({
      token: authToken,
    });

    if (
      req.params.accountId &&
      authPayload.accountId !== req.params.accountId
    ) {
      throw new UnAuthorizedAccessError();
    }

    req.accountId = authPayload.accountId;
    next();
  }
);
