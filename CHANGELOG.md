# Changelog

All notable changes to nomoji.dev will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Lefthook integration for Git hooks management
- Lefthook configuration file (lefthook.yml) with pre-commit, commit-msg, and pre-push hooks
- Comprehensive Lefthook integration documentation
- Lefthook setup examples and guides
- npm scripts for Lefthook installation (prepare, hooks:install, hooks:uninstall)
- Environment-aware CORS middleware with origin restrictions
- Comprehensive input validation for all API endpoints
- Cache API implementation with multiple TTL presets
- Rate limiting middleware using token bucket algorithm
- Content Security Policy and security headers
- Request size limits (100KB)
- KV expiration TTLs for automatic cleanup
- Improved HTTP status codes (400, 404, 413, 429)
- Security improvements documentation
- Best practices checklist

### Changed
- Refactored middleware stack for optimal security
- Updated all API endpoints with validation and caching
- Improved error responses with proper status codes
- Enhanced observability with additional headers

### Security
- Added CORS origin restrictions per environment
- Implemented comprehensive input validation
- Added rate limiting to prevent abuse
- Enabled CSP and security headers
- Added request size limits
- Improved error message safety in production

### Performance
- Implemented Cache API for GET requests
- Reduced KV reads by ~70% through caching
- Optimized response times (20ms cached, 100ms uncached)
- Added cache hit/miss headers
- Configured automatic TTL expiration

## [1.0.0] - 2024-11-01

### Added
- Initial release of nomoji.dev
- Cloudflare Workers application
- Hono web framework integration
- KV storage for user preferences
- Analytics Engine integration
- Comprehensive observability (logging, metrics, tracing)
- Health check endpoint
- Scheduled tasks (cron triggers)
- Tail Worker for log processing
- Support for multiple AI assistants:
  - Claude Code subagents
  - Cursor rules
  - GitHub Copilot
  - Codeium
- Configuration presets (strict, moderate, relaxed)
- Emoji analysis API
- Shareable configurations
- Git hooks for emoji enforcement
- Complete documentation suite

### Features
- RESTful API with JSON responses
- TypeScript with full type safety
- Smart Placement for optimal routing
- Multiple environment support
- Source maps for debugging
- Structured JSON logging
- Performance tracking
- Request ID correlation
- Analytics data collection

### Documentation
- README with quickstart
- API documentation
- Integration guides for AI assistants
- Observability guide
- CLI integration examples
- Contributing guidelines

[Unreleased]: https://github.com/blakebauman/nomoji.dev/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/blakebauman/nomoji.dev/releases/tag/v1.0.0

