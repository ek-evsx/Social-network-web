interface IRequest {
    post: (route: string, payload: any) => void;
}

class Request implements IRequest {
    post(route: string, payload: any) {
        console.log(route, payload);
    }
}

const request = new Request();

export default request;
