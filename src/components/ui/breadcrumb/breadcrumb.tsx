import "./breadcrumb.css"

export const Breadcrumb = ({items}) => {
    return (<nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
          <span className="d-flex align-items-center">
            <i className="bi bi-house me-2"></i>
          </span>
                </li>

                {items.map((item, index) => (
                    <li key={index} className={"ms-1 breadcrumb-custom"} >
                        {index === items.length - 1 ? (
                            item
                        ) : (
                            <span className="d-flex align-items-center">{item}<i className="bi bi-chevron-right mx-1"></i></span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

