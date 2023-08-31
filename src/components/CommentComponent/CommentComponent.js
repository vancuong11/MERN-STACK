function CommentComponent(props) {
    const { dataHref, width } = props;
    return (
        <div
            style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}
            className="fb-comments"
            data-href={dataHref}
            data-width={width}
            data-numposts="5"
        ></div>
    );
}

export default CommentComponent;
