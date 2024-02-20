# ====================================================================
# Build image
# ====================================================================

FROM python:3.12-alpine as builder

RUN apk --update --no-cache add \
    build-base 

RUN pip install poetry==1.6.1

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

WORKDIR /buildfolder

COPY pyproject.toml poetry.lock ./
RUN touch README.md

RUN poetry install --without dev --no-root && \
    rm -rf $POETRY_CACHE_DIR


# ====================================================================
# Runtime image
# ====================================================================

FROM python:3.12-alpine as runtime

RUN apk --update --no-cache add openssh-client

RUN adduser --disabled-password --gecos '' user

RUN mkdir -p /workspace/.venv && \
    chown -R user:user /workspace

RUN mkdir -p /workspace/src/app && \
    chown -R user:user /workspace

USER user

WORKDIR /workspace

ENV PYTHONPATH="/workspace/.venv/lib/python3.12/site-packages:/workspace/src" \
    LANG=C.UTF-8

ENV BACKEND_HOST=
ENV BACKEND_PORT=
ENV FRONTEND_HOST=
ENV FRONTEND_PORT=

ENV SPOTIFY_CLIENT_ID=
ENV SPOTIFY_CLIENT_SECRET=

# Copy only the necessary parts from the builder stage
COPY --from=builder /buildfolder/.venv/lib /workspace/.venv/lib
COPY --from=builder /buildfolder/.venv/bin /workspace/.venv/bin

COPY ./src /workspace/src