import { BaseError } from "src/domain/errors/base/base_error";
import { CommandError } from "src/domain/errors/command_error";
import { DomainServiceError } from "src/domain/errors/domain_service_error";
import { EntityError } from "src/domain/errors/entity_error";
import { ValueObjectError } from "src/domain/errors/value_object_error";

describe('# Errors UnitTest \n', () => {
  it('- Error \n', async () => {
    // 準備
    const error = new Error('');
    // 実行
    const result = error instanceof BaseError;
    // 確認
    expect(result).toBe(false);
  });

  it('- CommandError \n', async () => {
    // 準備
    const error = new CommandError('');
    // 実行
    const result = error instanceof BaseError;
    // 確認
    expect(result).toBe(true);
  });

  it('- DomainServiceError \n', async () => {
    // 準備
    const error = new DomainServiceError('');
    // 実行
    const result = error instanceof BaseError;
    // 確認
    expect(result).toBe(true);
  });

  it('- EntityError \n', async () => {
    // 準備
    const error = new EntityError('');
    // 実行
    const result = error instanceof BaseError;
    // 確認
    expect(result).toBe(true);
  });

  it('- ValueObjectError \n', async () => {
    // 準備
    const error = new ValueObjectError('');
    // 実行
    const result = error instanceof BaseError;
    // 確認
    expect(result).toBe(true);
  });
});