import React from 'react';

import { MessagesConfig } from '@shared/types';
import { Socket } from '@frontend/utils';

export type UpdateDialogProps = {
  currentMessages: MessagesConfig | undefined;
};

export default function UpdateDialog({ currentMessages }: UpdateDialogProps) {

  const dialog: HTMLDialogElement | null = document.getElementById('messages-modal') as HTMLDialogElement;

  const updateMessages = (form: FormData): void => {

    Socket.emit('update', {
      second: form.get('second') as string || currentMessages!.second,
      minute: form.get('minute') as string || currentMessages!.minute,
      hour: form.get('hour') as string || currentMessages!.hour
    });

    dialog?.close('closed');
  }

  return (
    <dialog id="messages-modal" className="modal">
      <div className="modal-box">
        <h1 className="bg-primary py-3 px-4 -mx-6 -mt-6 text-white text-xs font-bold uppercase">Update Messages</h1>
        <div className="modal-action block mt-0">
          <form className="space-y-6" action={ updateMessages }>
            <div className="grid md:grid-cols-3 gap-0 md:gap-4">
              <fieldset className="fieldset">
                <label htmlFor="second" className="fieldset-legend">Seconds</label>
                <input key={ currentMessages?.second } id="second" name="second" type="text" className="input w-full" placeholder={ currentMessages?.second } defaultValue={ currentMessages?.second } />
              </fieldset>

              <fieldset className="fieldset">
                <label htmlFor="minute" className="fieldset-legend">Minutes</label>
                <input key={ currentMessages?.minute } id="minute" name="minute" type="text" className="input w-full" placeholder={ currentMessages?.minute } defaultValue={ currentMessages?.minute } />
              </fieldset>

              <fieldset className="fieldset">
                <label htmlFor="hour" className="fieldset-legend">Hours</label>
                <input key={ currentMessages?.hour } id="hour" name="hour" type="text" className="input w-full" placeholder={ currentMessages?.hour } defaultValue={ currentMessages?.hour } />
              </fieldset>
            </div>

            <div className="flex items-center justify-between">
              <button className="btn" type="button" onClick={ () => dialog?.close('closed') }>Cancel</button>
              <button className="btn btn-primary" type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
