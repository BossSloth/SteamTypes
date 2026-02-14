# [2.1.0](https://github.com/BossSloth/SteamTypes/compare/v2.0.0...v2.1.0) (2026-02-14)


### Bug Fixes

* **types:** correct Destroy parameter type from BrowserViewInit to BrowserViewPopup ([60270ab](https://github.com/BossSloth/SteamTypes/commit/60270ab3924b3d80ce1da594efb72a7730c6a0be))


### Features

* added types for `StoreItemCache` ([b85b86d](https://github.com/BossSloth/SteamTypes/commit/b85b86d7fc55e56a8b6191087d320cbcbc1b9f78))
* **compare:** implement intelligent handling of synthetic extended base interfaces during comparison ([f714e55](https://github.com/BossSloth/SteamTypes/commit/f714e55b82f00c6447bafd411e72c59bab7696ce))
* **protobufs:** Updated and regenerated protobuf types ([612e7c8](https://github.com/BossSloth/SteamTypes/commit/612e7c87cc648b084425094373edf777df97e51d))
* **types:** add LocalizationManager types ([52d0fe3](https://github.com/BossSloth/SteamTypes/commit/52d0fe3f10e4757f65daf9b766e368dda754eb29))
* **types:** add NavigationStore global type ([37ca23c](https://github.com/BossSloth/SteamTypes/commit/37ca23c75fd4de15f3eef97920a34a7ab662dcce))
* **types:** add SteamClient.System.Network, SteamClient.System.Audio types and networking protobufs ([783d995](https://github.com/BossSloth/SteamTypes/commit/783d995de918598b7c4767274f2c5737f55a68b0))
* **types:** type ChatStore message types and other small changes ([b8af988](https://github.com/BossSloth/SteamTypes/commit/b8af988a9a565c7d69d77e4989edba4dbbd00176))
* **types:** Update SteamClient types and improve EmoticonStore types ([0a4254c](https://github.com/BossSloth/SteamTypes/commit/0a4254c83c35848470d9e04c566c6bc39e76e7fd))
* update all types for steam version 1769025840 ([b3aee36](https://github.com/BossSloth/SteamTypes/commit/b3aee36a29519496f5e0fc5847c36872b6b57b4a))

# [2.0.0](https://github.com/BossSloth/SteamTypes/compare/v1.0.2...v2.0.0) (2025-12-12)


### Bug Fixes

* **convert:** use right connectionmanager path ([183e4b0](https://github.com/BossSloth/SteamTypes/commit/183e4b0bb211bb6b9c0875dc71761e662617d328))
* filter out temp variable from auto generated window objects ([191f141](https://github.com/BossSloth/SteamTypes/commit/191f141294a7aed19c010899bc0e866b9eede169))
* knip linting no longer complaining about unused dependencies ([e026a1a](https://github.com/BossSloth/SteamTypes/commit/e026a1ac44fce99f99458a5b5c0500e51bb302b7))
* Mock steambrew if it doesn't exist ([a6e5702](https://github.com/BossSloth/SteamTypes/commit/a6e570221fcfda346659d8037d8932488c2578f2))
* move runtime out of main index.ts ([7f141ba](https://github.com/BossSloth/SteamTypes/commit/7f141ba142d0011b11b31f510f2cfc407c2d0db1))


### Features

* add client_objects protobufs ([94502ec](https://github.com/BossSloth/SteamTypes/commit/94502ec0c484b1215b74bf3daa18ea3b69cd9774))
* added sleep helper ([683b748](https://github.com/BossSloth/SteamTypes/commit/683b7488b8418bfd67e9d4beca0a54ceaaae7a9e))
* added TanStack QueryObserver type detection ([757ab53](https://github.com/BossSloth/SteamTypes/commit/757ab5320c2e68451e110311baaeff74e4974701))
* better module resolution ([8ea377b](https://github.com/BossSloth/SteamTypes/commit/8ea377b336c42d804cb341904c78dfdb732e8a2c))
* **compare:** add manual merge detection for multiple source interfaces into single target ([006272a](https://github.com/BossSloth/SteamTypes/commit/006272a7bcff1548a90c5d98f5f3a3671f478553))
* **compare:** add Record with interface comparison support in type comparator ([667c20f](https://github.com/BossSloth/SteamTypes/commit/667c20f557bd3bb628799b72745a15bf74842601))
* **compare:** add support for unwrapping parenthesized type nodes during comparison ([ea95953](https://github.com/BossSloth/SteamTypes/commit/ea95953163216ec4a5eb5a6ae8e857f3a82d3b3b))
* **compare:** handle Qualified names to not crash ([1277cb6](https://github.com/BossSloth/SteamTypes/commit/1277cb652817f3a87a539d11cc7ce85ca3fdb0a7))
* **compare:** improve heritage clause extends handling with interface name resolution ([52eeff2](https://github.com/BossSloth/SteamTypes/commit/52eeff20e33f415a0dce2d20bc6f467e5a498ebd))
* **compare:** remove duplicate union types in interface comparator ([adfc600](https://github.com/BossSloth/SteamTypes/commit/adfc600276c6ec4580857e055664ea80773af20e))
* **compare:** support ignore jsdoc for methods ([82b15d6](https://github.com/BossSloth/SteamTypes/commit/82b15d67b06c8a47b8aeb9dff04ed2803da5dd5b))
* **convert:** add support for ignoring specific properties during conversion for faster conversion times ([3c26472](https://github.com/BossSloth/SteamTypes/commit/3c2647280090bea3dfcd8125043352c5ebc1b78f))
* **convert:** enhance interface merging with inheritance support ([233580b](https://github.com/BossSloth/SteamTypes/commit/233580b99ca693179521746153dfe2b5891ca921))
* **convert:** handle automatic steamid type detection ([5aa2487](https://github.com/BossSloth/SteamTypes/commit/5aa24873b2c94fdc5f59553976b5e0aa640894d4))
* improve enum value name normalization in protobuf generation ([c24160b](https://github.com/BossSloth/SteamTypes/commit/c24160b0809d5bd32f725f431474c2a27d907221))
* **proto-gen:** make script more colorful ([b108c46](https://github.com/BossSloth/SteamTypes/commit/b108c4622e7065cc21430e87795ced06e3900c2e))
* **proto-gen:** preserve interface and enum comments ([76fa90b](https://github.com/BossSloth/SteamTypes/commit/76fa90b61c2305ddac33025833c9e78d318bd38d))
* **proto-gen:** prevent enum naming conflicts with interfaces in protobuf generation ([0b73de4](https://github.com/BossSloth/SteamTypes/commit/0b73de419f9efadb6dd37a6a89645f531d2607e1))
* **proto:** add a bunch more protobuf interfaces ([b515271](https://github.com/BossSloth/SteamTypes/commit/b515271e8122535d24932bd5a247d97204fa0701))
* **protobufs:** update protobuf definitions ([e38cf68](https://github.com/BossSloth/SteamTypes/commit/e38cf6806ed9ef41f70a23e36fafa4603e3bf0b9))
* **types:** add comprehensive documentation and stricter types for friend management ([f1dad10](https://github.com/BossSloth/SteamTypes/commit/f1dad10316c1f00556b0e648e0bf5335d3a0b2c2))
* **types:** add more protobuf types ([7f8e946](https://github.com/BossSloth/SteamTypes/commit/7f8e9464c42d6a1d7e34bec55c5c5eec4bf512e3))
* **types:** added AppStore types ([63e037e](https://github.com/BossSloth/SteamTypes/commit/63e037e8ca9604a35b752007a59514ae790b2ee0))
* **types:** Added types for global FriendStore ([cae001a](https://github.com/BossSloth/SteamTypes/commit/cae001adac6d0490219bcb2f7cee8a692b299d4e))
* **types:** document more of AppInfoStore and give it stricter types ([99cc17a](https://github.com/BossSloth/SteamTypes/commit/99cc17aa7d300c47f54b2d0e6bba4b000d84d908))
* **types:** extract ChatStore sub-stores into separate files ([3bc99ab](https://github.com/BossSloth/SteamTypes/commit/3bc99abf45223d8871c40777a419ddce225f6c56))
* **types:** typed appInfoStore ([7db7fab](https://github.com/BossSloth/SteamTypes/commit/7db7fabf02d5bb1a96ecc78fae046b470e3b4ca3))
* **types:** updated all types with steam version 1763795278 ([6e6244c](https://github.com/BossSloth/SteamTypes/commit/6e6244c1e409e8ffa946eb912d6aab65487ee636))
* **types:** updated SteamClient types ([a59680a](https://github.com/BossSloth/SteamTypes/commit/a59680a2b70376a7da60572fdfc11dc11db91dc9))
* update GamepadNavigationManager types ([0c52901](https://github.com/BossSloth/SteamTypes/commit/0c52901ab22ffcc0e817331f16a03e7d4a30c93b))
* **validate-types:** add per-interface timing breakdown with --timing flag ([df3c430](https://github.com/BossSloth/SteamTypes/commit/df3c43075f8669174e69e845291833796f0ace3d))


### Performance Improvements

* cache missing native function declarations ([8cbb074](https://github.com/BossSloth/SteamTypes/commit/8cbb0744d168cde39ce2451c9172fe976fb0e4dc))


### BREAKING CHANGES

* last breaking change before release

## [1.0.2](https://github.com/BossSloth/SteamTypes/compare/v1.0.1...v1.0.2) (2025-10-25)


### Bug Fixes

* correct casing in exports ([7933566](https://github.com/BossSloth/SteamTypes/commit/793356698b4994820a15fec798e49d450e5c8f2a))

## [1.0.1](https://github.com/BossSloth/SteamTypes/compare/v1.0.0...v1.0.1) (2025-10-25)


### Bug Fixes

* make @steambrew/client a peerDependency ([43619cd](https://github.com/BossSloth/SteamTypes/commit/43619cde19e8d5eb06b5301d895431c444bd8d82))
