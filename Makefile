# ANSI color codes
RED=\033[1;31m
GREEN=\033[1;32m
YELLOW=\033[1;33m
BLUE=\033[1;34m
PURPLE=\033[1;35m
CYAN=\033[1;36m
WHITE=\033[1;37m
RESET=\033[0m

build:
	@echo "$(CYAN) Compiling JS... $(RESET)"
	npm run compile

package:
	@echo "$(CYAN) Turning JS into VSIX... $(RESET)"
	npx vsce package

# Examples:
# make install EDITOR=code
# make install EDITOR=cursor
# make install EDITOR=windsurf
# make install EDITOR=antigravity
EDITOR ?= code
install: build package
	@echo "$(CYAN) Moving built VSIX to proper dir...$(RESET)"
	@mkdir -p ./builds
	@mv *.vsix ./builds/

	@echo "$(CYAN) Installing $(shell ls ./builds/*.vsix | tail -1) for editor $(EDITOR) ...$(RESET)"
	@if [ -z "$(EDITOR)" ]; then \
		echo "Usage: make install EDITOR=<editor>"; \
		echo "Supported editors: code, cursor, windsurf, antigravity"; \
		exit 1; \
	fi
	@$(EDITOR) --install-extension $(shell ls ./builds/*.vsix | tail -1)