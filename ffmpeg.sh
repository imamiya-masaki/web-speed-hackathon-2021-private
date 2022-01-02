TARGETDIR="$1"
OUTDIR="output/"
FILES=`find "$TARGETDIR" -maxdepth 1 -type f -name '*.gif'`
 
echo `pwd`
 
mkdir -p $OUTDIR
for file in $FILES; do
	echo $file
	TARGET=`basename "$file" .gif`
	dist="$OUTDIR"/"$TARGET"
	 cp "$file" "$dist".gif
	 ffmpeg -i "$dist".gif -c:v libvpx-vp9 "$dist".webm
	 rm "$dist".gif
	# jpegtran -arithmetic -progressive -arithmetic -copy all "$file" > "$OUTFILE"
	# SetFile -d "$CTIME" "$OUTFILE"
	# SetFile -m "$MTIME" "$OUTFILE"
done