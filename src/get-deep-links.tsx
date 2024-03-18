import "@jxa/global-type";
import { run } from "@jxa/run";
import { Clipboard, closeMainWindow, showHUD } from "@raycast/api";
import { Mail } from "@jxa/types/src/core/Mail";

export default async function GetDeepLinks() {
  return run<{ links: string[] }>(() => {
    const selection: Mail.Message[] = Application("Mail").selection();
    const links = [];
    for (let i = 0; i < selection.length; i++) {
      links.push('message://%3c' + selection[i].messageId() + '%3e');
    }
    return { links };
  })
    .then(({ links }) => {
      return Clipboard
        .copy(links.join("\n"))
        .then(() => showHUD(`Got ${links.length} link${links.length > 1 ? 's' : ''} in clipboard.`)
          .then(() => closeMainWindow())
        );
    })
}

