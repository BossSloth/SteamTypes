To setup the protobufs, you need to install the following:
- protoc
- ts-protoc-gen

You can install them with the following command:
```bash
bun add -d ts-protoc-gen
```

You can download protoc from here: https://github.com/protocolbuffers/protobuf/releases

Used packages:
- google-protobuf
- @types/google-protobuf
- ts-protoc-gen (probably or some fork of it or a post process script)
- or else (protoc-gen-ts)