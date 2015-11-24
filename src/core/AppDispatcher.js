import { Dispatcher } from 'flux';
import { AppConstants } from '../constants/';


class AppDispatcher extends Dispatcher {

    handleViewAction(action) {
        this.dispatch({
            source: AppConstants.VIEW_ACTION,
            action: action
        });
    }

    handleServerAction(action) {
        this.dispatch({
            source: AppConstants.SERVER_ACTION,
            action: action
        });
    }

}

const appDispatcher = new AppDispatcher();
export default appDispatcher;

// So we can conveniently do, `import {dispatch} from 'core/Dispatcher';`
export const dispatch = appDispatcher.dispatch.bind(appDispatcher);
