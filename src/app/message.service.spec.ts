import { MessageService } from "./message.service";

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  })

  it('should contain no message when freshly initialized', () => {
    expect(service.messages.length).toBe(0);
  })

  it('should collect the message when a message is added', () => {
    let message = 'This is a test message';

    service.add(message);

    expect(service.messages).toContain(message);
  })

  it('should stack messages if multiple messages are added', () => {
    let messages = ['first message', 'second message', 'third message'];

    service.add(messages[0]);
    service.add(messages[1]);
    service.add(messages[2]);

    expect(service.messages.length).toBe(3);
    expect(service.messages).toEqual(messages);
  })

  it('should remove all messages when cleared', () => {
    service.messages.push('one', 'two', 'three');

    service.clear();

    expect(service.messages.length).toBe(0);
  })
})
