import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function NotFound() {
  const error = useRouteError();
  console.log(error);
  let errorMessage, errorStatus;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data;
    errorStatus = error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Неизвестная ошибка';
  }

  return (
    <div id="not-found-page">
      <h1>Упс</h1>
      <p>Извините, такой страницы не существует.</p>
      <p>
        <p>
          <i>{errorStatus}</i>
        </p>
        <p>
          <i>{errorMessage}</i>
        </p>
      </p>
    </div>
  );
}
