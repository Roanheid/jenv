import { of } from 'rxjs';
import * as items from '../../../mocks/list.mock.json';

export class DataServiceMock {
  getListItems = jest.fn().mockReturnValue(of(items.items));
}
