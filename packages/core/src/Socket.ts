import { nanoid } from 'nanoid';
import { propEq } from 'rambda';
import { stringifyRpc, Doc } from './utils/stringify';

type Options = {
  host: string;
  port: number;
  secret?: string;
  secure?: boolean;
};
type Listener<K extends keyof WebSocketEventMap> = (ev: WebSocketEventMap[K]) => void;
type ListenerItem<K extends keyof WebSocketEventMap = keyof WebSocketEventMap> = K extends K
  ? {
      id: string;
      type: K;
      listener: Listener<K>;
    }
  : never;

class Socket {
  public url: string;

  public ws: WebSocket | undefined;

  constructor({ host, port, secure = false }: Options) {
    this.url = `${secure ? 'wss' : 'ws'}://${host}:${port}`;
  }

  public connect() {
    this.ws = new WebSocket(this.url);
    return new Promise<Event>((resolve, reject) => {
      this.addListener('open', (ev) => {
        resolve(ev);
        this.ws?.addEventListener('close', () => {
          this.listenerList.forEach(({ id }) => this.removeListener(id));
        });
      });
      this.addListener('error', reject);
    });
  }

  public disconnect() {
    Socket.checkConnection(this.ws);
    this.ws.close();
  }

  public send(data: Doc) {
    Socket.checkConnection(this.ws);
    this.ws.send(stringifyRpc(data));
  }

  private listenerList: ListenerItem[] = [];

  private addListener<K extends keyof WebSocketEventMap>(type: K, listener: Listener<K>) {
    Socket.checkConnection(this.ws);
    this.ws.addEventListener(type, listener);
    const id = nanoid(4);

    this.listenerList.push({
      id,
      type,
      listener,
    } as ListenerItem<K>);
    return id;
  }

  private removeListener(id: string) {
    const index = this.listenerList.findIndex(propEq('id', id));
    if (index === -1) {
      throw new Error('listener not found');
    }

    Socket.checkConnection(this.ws);
    this.ws.removeEventListener(
      this.listenerList[index].type,
      this.listenerList[index].listener as Listener<keyof WebSocketEventMap>,
    );
    this.listenerList.splice(index, 1);
  }

  static checkConnection(ws: WebSocket | undefined): asserts ws is WebSocket {
    if (ws === undefined) {
      throw new Error('Socket is not connected');
    }
  }
}

export default Socket;
