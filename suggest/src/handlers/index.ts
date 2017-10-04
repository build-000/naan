import HandlerWrapper from "./handler_wrapper";

// List of handlers
import mockApi from "./mock_api";
import suggest from "./suggest";
import hello from "./hello";

const handlers = {
  mockApi: HandlerWrapper.safelyWrap(mockApi),
  suggest: HandlerWrapper.safelyWrap(suggest),
  hello: hello,
};

export = handlers;
