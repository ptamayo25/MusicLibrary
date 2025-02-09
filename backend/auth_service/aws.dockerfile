# Lambda image
FROM public.ecr.aws/lambda/nodejs:22 

ENV NODE_ENV=production
ENV NPM_CONFIG_CACHE=/tmp/.npm
ENV DEPLOY_AWS_LAMBDA=true

# Do not need WORKDIR because image comes with default WORKDIR

COPY package.json ${LAMBDA_TASK_ROOT}/
COPY package-lock.json ${LAMBDA_TASK_ROOT}/

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# User is not needed since image comes with a default user.

COPY controllers/ ${LAMBDA_TASK_ROOT}/controllers
COPY middlewares/ ${LAMBDA_TASK_ROOT}/middlewares
COPY models/ ${LAMBDA_TASK_ROOT}/models
COPY routes/ ${LAMBDA_TASK_ROOT}/routes
COPY index.js ${LAMBDA_TASK_ROOT}
COPY ./passport.js ${LAMBDA_TASK_ROOT}

CMD [ "index.handler" ]
