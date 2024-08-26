export const em = (data: {
  body: string;
  title: string;
  uuid: string;
}) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <link
      href="https://fonts.googleapis.com/css?family=New+Amsterdam:400"
      rel="stylesheet"
      type="text/css"
    />
  </head>
  <div
    style="
      display: none;
      overflow: hidden;
      line-height: 1px;
      opacity: 0;
      max-height: 0;
      max-width: 0;
    "
  >
    ${data.title}
  </div>
  <body
    style="
      background-color: #52562d;
      margin-top: auto;
      margin-bottom: auto;
      margin-left: auto;
      margin-right: auto;
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
        'Noto Color Emoji';
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    "
  >
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="20"
      cellspacing="0"
      role="presentation"
      style="
        max-width: 465px;
        border-width: 2px;
        border-style: solid;
        border-color: rgb(229, 231, 235);
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
          rgba(0, 0, 0, 0) 0px 0px 0px 0px,
          rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
          rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;
        border-radius: 0.25rem;
        margin-top: 80px;
        margin-bottom: 80px;
        margin-left: auto;
        margin-right: auto;
      "
    >
      <tbody style="background-color: white">
        <tr style="width: 100%">
          <td>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="margin-top: 5px"
            >
              <tbody>
                <tr>
                  <td>
                    <img
                      alt="Camo Hat"
                      height="150"
                      src="https://wwd.com/wp-content/uploads/2024/08/Chappel-Roan-CamoV2-1200_9b6e61a0-b2b6-40cd-b500-a8c0818313a9.webp?w=300"
                      style="
                        display: block;
                        outline: none;
                        border: none;
                        text-decoration: none;
                        margin-left: auto;
                        margin-right: auto;
                      "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            ${data.body}
            <hr
              style="
                width: 100%;
                border: none;
                border-top: 1px solid #eaeaea;
                border-width: 1px;
                border-style: solid;
                border-color: rgb(229, 231, 235);
                margin-bottom: 20px;
                margin-top: 32px;
              "
            />
            <p
              style="
                font-size: 14px;
                line-height: 16px;
                color: rgb(102, 102, 102);
              "
            >
              This email was sent on behalf of
              <a href="https://toastcat.club">Toastcat LLC</a> because you
              signed up for notifications at
              <a href="https://kamalacamo.org">KamalaCamo.org</a>
            </p>
            <p
              style="
                font-size: 14px;
                line-height: 16px;
                color: rgb(102, 102, 102);
              "
            >
              If you do not wish to receive these emails anymore, make sure you
              <a href="https://kamalacamo.org/api/unsubscribe/${data.uuid}"
                >unsubscribe</a
              >.
            </p>
            <p
              style="
                font-size: 14px;
                line-height: 16px;
                color: rgb(102, 102, 102);
              "
            >
              Not paid for by any candidate or candidates' committee.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`;

export const notificationTemplate = (uuid) => `
<p style="font-size: 18px">
    You requested to be notified when the Harris-Walz camo hats came
    back in stock, and we have some exciting news. They are
    <b>back!!!</b>
</p>
<a
    href="https://store.kamalaharris.com/harris-walz-printed-camo-hat/"
    style="
    background-color: #fbb02e;
    display: block;
    line-height: 60px;
    font-size: 24px;
    text-align: center;
    text-decoration: none !important;
    text-decoration: none;
    border-radius: 5px;
    font-family: 'New Amsterdam';
    "
>
    <table
    align="center"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="margin-top: 5px"
    >
    <tbody>
        <tr>
        <td style="color: white">Purchase</td>
        </tr>
    </tbody>
    </table>
</a>
<p style="font-size: 18px">Got a hat? Nice, feel free to</p>
<a
    href="https://kamalacamo.org/api/unsubscribe/${uuid}"
    style="
    background-color: #fb6108;
    display: block;
    line-height: 43px;
    font-size: 18px;
    text-align: center;
    text-decoration: none !important;
    text-decoration: none;
    border-radius: 5px;
    font-family: 'New Amsterdam';
    "
>
    <table
    align="center"
    width="100%"
    border="0"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="margin-top: 5px"
    >
    <tbody>
        <tr>
        <td style="color: #f5deb3">Unsubscribe</td>
        </tr>
    </tbody>
    </table>
</a>`;

export const verifyTemplate = `
<p style="font-size: 18px">
    Thanks for signing up for notifications about the Harris-Walz camo
    hats. We just need to verify your email address. Click the link below
    to confirm your subscription. You will only receive notifications when
    the hats are back in stock.
</p>
<a
    href="https://kamalacamo.org/api/verify/{{uuid}}"
    style="
      background-color: #fbb02e;
      display: block;
      line-height: 60px;
      font-size: 24px;
      text-align: center;
      text-decoration: none !important;
      text-decoration: none;
      border-radius: 5px;
      font-family: 'New Amsterdam';
    "
>
    Verify Email
</a>
<p style="font-size: 18px">If you did not sign up for these emails, you can ignore this message.</p>`;

console.log(
  em({
    body: notificationTemplate("{{uuid}}"),
    title: "The Hats Are Back In Stock",
    uuid: "{{uuid}}",
  })
    .replaceAll("\n", "\\n")
    .replaceAll("  ", "")
    .replaceAll('"', '\\"')
);
