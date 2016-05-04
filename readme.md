# Quadtree Map Compression

This module takes a `.tmx` file from Tiled and compresses it using a quadtree. Essentially, the algorithm groups empty spaces in the map together to produce a file that's smaller than the original. The real benefit is that the map is now easier to use with quadtrees on the client.

## Issues

* Because of the nature of this compression, it isn't as efficient as it could be
* It only operates on the first layer of the tmx file and discards the rest
* Don't actually use this
