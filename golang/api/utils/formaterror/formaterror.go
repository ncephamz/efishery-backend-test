package formaterror

import (
	"errors"
	"strings"
)

func FormatError(err string) error {

	if strings.Contains(err, "Phone") {
		return errors.New("Phone already registered")
	}

	return errors.New("Incorrect Details")
}
